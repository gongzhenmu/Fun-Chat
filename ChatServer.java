//Green 4/6 23:09

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.text.SimpleDateFormat;
import java.util.*;

final class ChatServer {
    private static int uniqueId = 0;
    // Data structure to hold all of the connected clients
    private final List<ClientThread> clients = new ArrayList<>();
    private final int port;          // port the server is hosted on

    boolean check;

    /**
     * ChatServer constructor
     * @param port - the port the server is being hosted on
     */
    private ChatServer(int port) {
        this.port = port;
    }

    /*
     * This is what starts the ChatServer.
     * Right now it just creates the socketServer and adds a new ClientThread to a list to be handled
     */
    private void start() {
        try {
            ServerSocket serverSocket = new ServerSocket(port);
            while(true){
                System.out.println(time()+" Server waiting for clients on port "+ port);
                Socket socket = serverSocket.accept();
                Runnable r = new ClientThread(socket, uniqueId++);
                ClientThread rr=(ClientThread)r;

                Thread t = new Thread(r);

                clients.add((ClientThread) r);

                //the user connected because the thread is ready.
                System.out.println(time() +rr.username+" just connected");
                //try to add the arraylist, if duplicate, close it before run
                //the thread
                for(int i=0;i<clients.size()-1;i++){
                  //  &&clients.get(i).id==rr.id
                    if(clients.get(i).username.equals(rr.username)){
                        rr.writeMessage("Sorry, a user with username: "+rr.username+" already exists");
                        rr.writeMessage("server has closed the connection");
                        clients.remove(rr);
                        check=false;
                        //rr.sInput.close();
                        //rr.sOutput.close();
                        //rr.socket.close();
                        //f=false;
                        break;
                    }
                }
//                if(!f){
//                    break;
//                }
                t.start();
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /*
     * Time String
     * SXM
     */
    private String time(){
        Date date= new Date();
        SimpleDateFormat sdf=new SimpleDateFormat("HH:mm:ss");
        return sdf.format(date);
    }

    /*
     *  > java ChatServer
     *  > java ChatServer portNumber
     *  If the port number is not specified 1500 is used
     */
    public static void main(String[] args) {
        if(args.length==0){
            ChatServer server = new ChatServer(1500);
            server.start();
        }
        else{
            ChatServer server = new ChatServer(Integer.parseInt(args[0]));
            server.start();
        }

    }

    /*
     * This is a private class inside of the ChatServer
     * A new thread will be created to run this every time a new client connects.
     */
    private final class ClientThread implements Runnable {
        Socket socket;                  // The socket the client is connected to
        ObjectInputStream sInput;       // Input stream to the server from the client
        ObjectOutputStream sOutput;     // Output stream to the client from the server
        String username;                // Username of the connected client
        ChatMessage cm;                 // Helper variable to manage messages
        int id;

        /*
         * socket - the socket the client is connected to
         * id - id of the connection
         */
        private ClientThread(Socket socket, int id) {
            this.id = id;
            this.socket = socket;


            try {
                sOutput = new ObjectOutputStream(socket.getOutputStream());
                sInput = new ObjectInputStream(socket.getInputStream());
                username = (String) sInput.readObject();

            } catch (IOException | ClassNotFoundException e) {
                e.printStackTrace();
            }
        }
        private synchronized void  broadcast(String message){
            for(ClientThread x: clients){
                x.writeMessage(time()+" "+this.username+": "+message+"\n");
            }
            System.out.println(time()+" "+this.username+": "+message);
        }
        private boolean writeMessage(String msg){
            try{
                sOutput.writeObject(msg);
                sOutput.flush();
            }
            catch (IOException e){
            }

            if(socket.isConnected())
                return true;
            else
                return false;
        }
        private synchronized void remove(int id){
            for(ClientThread x: clients){
                if(x.id==id){
                    clients.remove(x);

                    break;
                }
            }
        }
        private void close(){

            this.writeMessage(time()+" "+this.username+" is loged out. ");
            System.out.println(time()+" "+this.username+" is loged out. ");
            try{
                remove(id);
                sInput.close();
                sOutput.close();
                socket.close();
                //this.close();
                // File f =

            }catch (IOException e){

            }
        }
        /*
         * This is used to print list
         * SXM
         */


        private void printList(int i){

            String nameList=" ";
            for(ClientThread x: clients){
                if(x.socket.isConnected()&&!x.username.equals(username)){
                    nameList+=x.username+" ";
                }
            }
            for(ClientThread x: clients){
                if(x.id==i){
                    x.writeMessage(time()+" List of users connected " +
                            "right now:"+nameList);
                    System.out.println("List of users connected right now");
                    break;
                }
            }
        }

        /*
         * This is used to send private message
         * SXM
         */

        private void sendPrivateMessage(int sendID, String recipient,String s){

            String message="";
            ClientThread sender=null;
            ClientThread receiver=null;

            for(ClientThread x: clients){
                if(x.id==sendID){
                    message+=x.username+" ->";
                    sender=x;
                    break;
                }

            }
            for(ClientThread x: clients){
                if(x.username.equals(recipient)){
                    receiver=x;
                    message+=recipient +" "+ s;
                    break;
                }
            }

            //System.out.println(time()+username+"->"+recipient+" "+s);
            sender.writeMessage(time()+message);
            receiver.writeMessage(time()+message);
        }

        /*
         * This is what the client thread actually runs.
         */

        @Override
        public void run() {
            // Read the username sent to you by client
            try {
                check=true; // the client is not log out?
                while(check){
                    ChatMessage cm=(ChatMessage) sInput.readObject();
                    switch(cm.getType()){
                        case ChatMessage.DM:
                            boolean receiverexist=false;
                            for(ClientThread x: clients){
                                if(x.username.equals(cm.recipient)){
                                    receiverexist=true;
                                    break;
                                }
                            }
                            if(receiverexist==true) {
                                System.out.println(time()+username+"->"+cm.recipient+" "+cm.msg);
                                sendPrivateMessage(this.id, cm.recipient, cm.msg);
                            }else {
                                writeMessage("user does not exist");
                            }
                            break;
//                        case ChatMessage.LIST:
//                            printList(id);
//                            break;
                        case ChatMessage.LOGOUT:
                            check=false;
                            this.close();
                            break;
                        default:
                            broadcast(cm.msg);
                            break;
                    }
                }
            } catch (IOException | ClassNotFoundException e) {
                //e.printStackTrace();
               // System.out.println("");
            }
        }

    }
}








