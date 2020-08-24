package st.pro.browsergame.models;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Model representing the Character created by the player and their inherent
 * statistics and abilities
 * 
 * @author GU
 */
@JsonIgnoreProperties({ "owner" })
@Entity
public class Character implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String name;
	private String race;
	private String characterClass;
	@ManyToOne(fetch = FetchType.EAGER)
	private User owner;

	private int level;

	/**
	 * Shortened to STR
	 */
	private int strength;
	/**
	 * Shortened to AGI
	 */
	private int agility;
	/**
	 * Shortened to FOR
	 */
	private int fortitude;
	/**
	 * Shortened to INT
	 */
	private int intelligence;
	/**
	 * Shortened to MAG
	 */
	private int magic;
	/**
	 * Shortened to LCK
	 */
	private int luck;

	/**
	 * Derived from STR
	 */
	private char swordfighting;
	/**
	 * Derived from AGI
	 */
	private char acrobatics;
	/**
	 * Derived from FOR
	 */
	private char defense;
	/**
	 * Derived from INT
	 */
	private char investigation;
	/**
	 * Derived from MAG
	 */
	private char spellcasting;
	/**
	 * Derived from LCK
	 */
	private char gambit;

	/**
	 * Required for Training
	 */
	private int swordfightingProgress = 0;
	private int acrobaticsProgress = 0;
	private int defenseProgress = 0;
	private int investigationProgress = 0;
	private int spellcastingProgress = 0;

	/**
	 * Key if hero can go on a mission or training or is already busy
	 */
	private boolean isBusy = false;

	// SPECIAL SKILLS HERE WHEN THEY ARE READY

	public Character() {

	}

	public Character(String name, String race, String characterClass, int level, int strength, int agility,
			int fortitude, int intelligence, int magic, int luck, char swordfighting, char acrobatics, char defense,
			char investigation, char spellcasting, char gambit) {
		super();
		this.name = name;
		this.race = race;
		this.characterClass = characterClass;
		this.level = level;
		this.strength = strength;
		this.agility = agility;
		this.fortitude = fortitude;
		this.intelligence = intelligence;
		this.magic = magic;
		this.luck = luck;
		this.swordfighting = swordfighting;
		this.acrobatics = acrobatics;
		this.defense = defense;
		this.investigation = investigation;
		this.spellcasting = spellcasting;
		this.gambit = gambit;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRace() {
		return race;
	}

	public void setRace(String race) {
		this.race = race;
	}

	public String getCharacterClass() {
		return characterClass;
	}

	public void setCharacterClass(String characterClass) {
		this.characterClass = characterClass;
	}

	public User getOwner() {
		return owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public int getStrength() {
		return strength;
	}

	public void setStrength(int strength) {
		this.strength = strength;
	}

	public int getAgility() {
		return agility;
	}

	public void setAgility(int agility) {
		this.agility = agility;
	}

	public int getFortitude() {
		return fortitude;
	}

	public void setFortitude(int fortitude) {
		this.fortitude = fortitude;
	}

	public int getIntelligence() {
		return intelligence;
	}

	public void setIntelligence(int intelligence) {
		this.intelligence = intelligence;
	}

	public int getMagic() {
		return magic;
	}

	public void setMagic(int magic) {
		this.magic = magic;
	}

	public int getLuck() {
		return luck;
	}

	public void setLuck(int luck) {
		this.luck = luck;
	}

	public char getSwordfighting() {
		return swordfighting;
	}

	public void setSwordfighting(char swordfighting) {
		this.swordfighting = swordfighting;
	}

	public char getAcrobatics() {
		return acrobatics;
	}

	public void setAcrobatics(char acrobatics) {
		this.acrobatics = acrobatics;
	}

	public char getDefense() {
		return defense;
	}

	public void setDefense(char defense) {
		this.defense = defense;
	}

	public char getInvestigation() {
		return investigation;
	}

	public void setInvestigation(char investigation) {
		this.investigation = investigation;
	}

	public char getSpellcasting() {
		return spellcasting;
	}

	public void setSpellcasting(char spellcasting) {
		this.spellcasting = spellcasting;
	}

	public char getGambit() {
		return gambit;
	}

	public void setGambit(char gambit) {
		this.gambit = gambit;
	}

	public int getSwordfightingProgress() {
		return swordfightingProgress;
	}

	public void setSwordfightingProgress(int swordfightingProgress) {
		this.swordfightingProgress = swordfightingProgress;
	}

	public int getAcrobaticsProgress() {
		return acrobaticsProgress;
	}

	public void setAcrobaticsProgress(int acrobaticsProgress) {
		this.acrobaticsProgress = acrobaticsProgress;
	}

	public int getDefenseProgress() {
		return defenseProgress;
	}

	public void setDefenseProgress(int defenseProgress) {
		this.defenseProgress = defenseProgress;
	}

	public int getInvestigationProgress() {
		return investigationProgress;
	}

	public void setInvestigationProgress(int investigationProgress) {
		this.investigationProgress = investigationProgress;
	}

	public int getSpellcastingProgress() {
		return spellcastingProgress;
	}

	public void setSpellcastingProgress(int spellcastingProgress) {
		this.spellcastingProgress = spellcastingProgress;
	}

	public boolean isBusy() {
		return isBusy;
	}

	public void setBusy(boolean isBusy) {
		this.isBusy = isBusy;
	}

}
