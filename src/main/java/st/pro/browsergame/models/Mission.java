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
 * @author Pc
 *
 */

@Entity
public class Mission implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String title;
	private int crystalCost;
	private int rewardGold;
	private int rewardGuildPoints;
	private String description;
	private int missionTime;
	private String statOne;
	private String statTwo;
	private String skillOne;
	private String skillTwo;
	private String difficulty;
	private String image;

	public Mission() {
		
	}

	public Mission(String title, int crystalCost, int rewardGold, int rewardGuildPoints,
			String description, int missionTime, String statOne, String statTwo, String skillOne,
			String skillTwo, String difficulty, String image) {
		super();
		this.title = title;
		this.crystalCost = crystalCost;
		this.rewardGold = rewardGold;
		this.rewardGuildPoints = rewardGuildPoints;
		this.description = description;
		this.missionTime = missionTime;
		this.statOne = statOne;
		this.statTwo = statTwo;
		this.skillOne = skillOne;
		this.skillTwo = skillTwo;
		this.difficulty = difficulty;
		this.image = image;

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

	public int getCrystalCost() {
		return crystalCost;
	}

	public void setCrystalCost(int crystalCost) {
		this.crystalCost = crystalCost;
	}

	public int getRewardGold() {
		return rewardGold;
	}

	public void setRewardGold(int rewardGold) {
		this.rewardGold = rewardGold;
	}

	public int getRewardGuildPoints() {
		return rewardGuildPoints;
	}

	public void setRewardGuildPoints(int rewardGuildPoints) {
		this.rewardGuildPoints = rewardGuildPoints;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getMissionTime() {
		return missionTime;
	}

	public void setMissionTime(int missionTime) {
		this.missionTime = missionTime;
	}

	public String getStatOne() {
		return statOne;
	}

	public void setStatOne(String statOne) {
		this.statOne = statOne;
	}

	public String getStatTwo() {
		return statTwo;
	}

	public void setStatTwo(String statTwo) {
		this.statTwo = statTwo;
	}

	public String getSkillOne() {
		return skillOne;
	}

	public void setSkillOne(String skillOne) {
		this.skillOne = skillOne;
	}

	public String getSkillTwo() {
		return skillTwo;
	}

	public void setSkillTwo(String skillTwo) {
		this.skillTwo = skillTwo;
	}
	

	public String getDifficulty() {
		return difficulty;
	}

	public void setDifficulty(String difficulty) {
		this.difficulty = difficulty;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	
	
	
}