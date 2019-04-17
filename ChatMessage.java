import java.io.Serializable;

final class ChatMessage implements Serializable {
    private static final long serialVersionUID = 6898543889087L;

    // Types of messages
    static final int MESSAGE = 0, LOGOUT = 1, DM = 2;
            //LIST = 3;

    // Here is where you should implement the chat message object.
    int type;
    String msg;
    String recipient;
    public ChatMessage(){}
    public ChatMessage(int type, String msg, String recipient){
        setMsg(msg);
        setRecipient(recipient);
        setType(type);

    }
    // Variables, Constructors, Methods, etc.

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public void setType(int type) {
        this.type = type;
    }

    public int getType() {
        return type;
    }

    public String getRecipient() {
        return recipient;
    }

    public String getMsg() {
        return msg;
    }
}

