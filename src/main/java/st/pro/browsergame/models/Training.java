/**
 * 
 */
package st.pro.browsergame.models;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;



/**
 * @author Pc
 *
 */

@Entity
public class Training implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String title;
	private int trainingTime;
	private String trainingSkill;
	private String trainingDifficulty;
	private int trainingCost;
	private String description;
	private String trainingImage;
	private LocalDateTime trainingStartTime;
	

	public Training() {
		
	}

	public Training(String title, int trainingTime, String trainingSkill, String trainingDifficulty, int trainingCost,
			String description, String trainingImage) {
		super();
		this.title = title;
		this.trainingTime = trainingTime;
		this.trainingSkill = trainingSkill;
		this.trainingDifficulty = trainingDifficulty;
		this.trainingCost = trainingCost;
		this.description = description;
		this.trainingImage = trainingImage;

	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public int getTrainingTime() {
		return trainingTime;
	}

	public void setTrainingTime(int trainingTime) {
		this.trainingTime = trainingTime;
	}

	public String getTrainingSkill() {
		return trainingSkill;
	}

	public void setTrainingSkill(String trainingSkill) {
		this.trainingSkill = trainingSkill;
	}

	public int getTrainingCost() {
		return trainingCost;
	}

	public void setTrainingCost(int trainingCost) {
		this.trainingCost = trainingCost;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getTrainingImage() {
		return trainingImage;
	}

	public void setTrainingImage(String trainingImage) {
		this.trainingImage = trainingImage;
	}

	public LocalDateTime getTrainingStartTime() {
		return trainingStartTime;
	}

	public void setTrainingStartTime(LocalDateTime trainingStartTime) {
		this.trainingStartTime = trainingStartTime;
	}

	public String getTrainingDifficulty() {
		return trainingDifficulty;
	}

	public void setTrainingDifficulty(String trainingDifficulty) {
		this.trainingDifficulty = trainingDifficulty;
	}	
	
}