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
 * Represents the Character, or Hero, created by Users. Class lists name, race,
 * hero class, six statistics, six abilities, progress trackers for each
 * ability, busy status and owner
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
	 * Six statistics, or stats, which have values between 13 to 18, non-repeatable,
	 * assigned by Users at creation. Stats are used to determine Mission end
	 * results. Please see {@link Mission}
	 * 
	 */
	private int strength;
	private int agility;
	private int fortitude;
	private int intelligence;
	private int magic;
	private int luck;

	/**
	 * Six abilities, which are initiated with E rank at creation. Ranks range from
	 * E -> D -> C -> B -> A -> S. Ranks is increased with training the specific
	 * ability. Abilities are used to determine Mission end results. Please see
	 * {@link Training} and {@link Mission}
	 */
	private char swordfighting = 'E';
	private char acrobatics = 'E';
	private char defense = 'E';
	private char investigation = 'E';
	private char spellcasting = 'E';
	private char gambit = 'E';

	/**
	 * Tied to the abilities above and are initiated with value 0 at creation.
	 * Successful training increases them incrementally, depending on training
	 * difficulty. When reaching a specified value, they signify their ability needs
	 * to rank up and are reset back to 0. Please see {@link Training} and
	 * {@link st.pro.browsergame.rest.CharacterCreatorRest#updateSwordfighting(Integer, String)
	 * updateSwordfighting} and similar methods.
	 */
	private int swordfightingProgress = 0;
	private int acrobaticsProgress = 0;
	private int defenseProgress = 0;
	private int investigationProgress = 0;
	private int spellcastingProgress = 0;
	private int gambitProgress = 0;

	/**
	 * Determines if a hero is free to go on a Mission or Training. False allows to
	 * start them, true does not. Please see {@link Mission}, {@link Training} and
	 * {@link st.pro.browsergame.rest.CharacterCreatorRest#switchCharacterStatus(Integer)
	 * switchCharacterStatus}
	 */
	private boolean isBusy = false;

	// SPECIAL SKILLS HERE WHEN THEY ARE READY

	public Character() {

	}

	public Character(String name, String race, String characterClass, int level, int strength, int agility,
			int fortitude, int intelligence, int magic, int luck) {
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

	public int getGambitProgress() {
		return gambitProgress;
	}

	public void setGambitProgress(int gambitProgress) {
		this.gambitProgress = gambitProgress;
	}

	public boolean isBusy() {
		return isBusy;
	}

	public void setBusy(boolean isBusy) {
		this.isBusy = isBusy;
	}

}
