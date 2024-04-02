package sn.douanes.exception.entities;

public class AgentNotFoundException extends Exception {

	private static final long serialVersionUID = 1L;

	public AgentNotFoundException(String message) {
        super(message);
    }
}
