/**
 * 
 */
package st.pro.browsergame.models;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Model representing the user comments
 * 
 * @author
 */
@Entity
public class Comment implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private String commenterName;
	private String commenterEmail;
	private String commenterComment;

	public Comment() {

	}

	public Comment(String commenterName, String commenterEmail, String commenterComment) {

		this.commenterName = commenterName;
		this.commenterEmail = commenterEmail;
		this.commenterComment = commenterComment;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCommenterName() {
		return commenterName;
	}

	public void setCommenterName(String commenterName) {
		this.commenterName = commenterName;
	}

	public String getCommenterEmail() {
		return commenterEmail;
	}

	public void setCommenterEmail(String commenterEmail) {
		this.commenterEmail = commenterEmail;
	}

	public String getCommenterComment() {
		return commenterComment;
	}

	public void setCommenterComment(String commenterComment) {
		this.commenterComment = commenterComment;
	}

}