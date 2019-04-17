//Green 4/6 23:09

import com.sun.xml.internal.ws.policy.privateutil.PolicyUtils;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.ConnectException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.net.Socket;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Scanner;

final class ChatClient {
    private ObjectInputStream sInput;
    private ObjectOutputStream sOutput;
    private Socket socket;

    private final String server;
    private final String username;
    private final int port;

    private boolean check=true;

    /* ChatClient constructor
     * @param server - the ip address of the server as a string
     * @param port - the port number the server is hosted on
     * @param username - the username of the user connecting
     */

    private ChatClient(String username, int port, String server) {
        this.server = server;
        this.port = port;
        this.username = username;
    }

    /*
     * Time String
     * SXM
     */
    private String time() {
        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
        return sdf.format(date);
    }

    /**
     * Attempts to establish a connection with the server
     *
     * @return boolean - false if any errors occur in startup, true if successful
     */
    private boolean start() {
        // Create a socket
        try {
            socket = new Socket(server, port);

            //System.out.println("connection accepted"+ );
        } catch (IOException e) {
            //if the server does not run first, printout message as following
            System.out.println("Exception connecting to socket: java.net.ConnectionException: Connection refused: connect");
            System.out.println("Client could not be started.");
            return false;
        }

        // Attempt to create output stream
        try {
            sOutput = new ObjectOutputStream(socket.getOutputStream());

        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }

        // Attempt to create input stream
        try {
            sInput = new ObjectInputStream(socket.getInputStream());
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }

        // Create client thread to listen from the server for incoming messages
        Runnable r = new ListenFromServer();
        Thread t = new Thread(r);
        //if the thread is ready, printout connection accepted.
        try {
            System.out.println("Connection accepted"  +  InetAddress.getByName(server) +":"+port);
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
        t.start();//pay attention to this


        // After starting, send the clients username to the server.
        try {
            sOutput.writeObject(username);
            sOutput.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }


        Scanner in = new Scanner(System.in);
        String input;


        while (in.hasNext()) {
            //System.out.println("ready to input");
            input = in.nextLine();
            //System.out.println("ready to input2");
            String strs[] = input.split(" ");
            String message = "";
            ChatMessage cm = new ChatMessage();
            switch (strs[0]) {
                case "/msg":

                    cm.setType(ChatMessage.DM);
                    message = "";
                    cm.setRecipient(strs[1]);
                    for (int i = 2; i < strs.length; i++) {
                        message += strs[i]+" ";
                    }
                    cm.setMsg(message);
                    break;
//                case "/list":
//                    cm.setType(ChatMessage.LIST);
//                    cm.setMsg("");
//                    cm.setRecipient("");
//                    break;
                case "/logout":
                    cm.setType(ChatMessage.LOGOUT);
                    cm.setMsg("");
                    cm.setRecipient("");
                    check=false;

                    break;
                default:
                    cm.setType(ChatMessage.MESSAGE);
                    message = "";
                    for (int i = 0; i < strs.length; i++) {
                        message += strs[i]+" ";
                    }
                    cm.setMsg(message);
                    cm.setRecipient("");

                    break;
            }
            sendMessage(cm);

        }
        return true;
    }


    /*
     * Sends a string to the server
     * @param msg - the message to be sent
     */
    private void sendMessage(ChatMessage msg) {
        try {
            sOutput.writeObject(msg);
            sOutput.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    /*
     * To start the Client use one of the following command
     * > java ChatClient
     * > java ChatClient username
     * > java ChatClient username portNumber
     * > java ChatClient username portNumber serverAddress
     *
     * If the portNumber is not specified 1500 should be used
     * If the serverAddress is not specified "localHost" should be used
     * If the username is not specified "Anonymous" should be used
     */
    public static void   main(String[] args) throws ConnectException{
        // Get proper arguments and override defaults
        // Create your client and start it
        // Send an empty message to the server

        if(args.length==0){
            ChatClient client = new ChatClient("Anonymous",1500,"localhost");
            client.start();
        }
        else if(args.length==1){
            ChatClient client = new ChatClient(args[0],1500,"localhost");
            client.start();
        }
        else if(args.length==2){
            ChatClient client = new ChatClient(args[0],Integer.parseInt(args[1]),"localhost");
            client.start();
        }
        else{
            ChatClient client = new ChatClient(args[0],Integer.parseInt(args[1]),args[2]);
            client.start();
        }
    }


    /*
     * This is a private class inside of the ChatClient
     * It will be responsible for listening for messages from the ChatServer.
     * ie: When other clients send messages, the server will relay it to the client.
     */
    private final class ListenFromServer implements Runnable {
        public void run() {
            try {
                while(check){
                    System.out.println();
                    String msg = (String) sInput.readObject();
                    System.out.print(msg);

                }

            } catch (IOException | ClassNotFoundException e) {
                System.out.println("server is off");
            }
        }
    }
}





