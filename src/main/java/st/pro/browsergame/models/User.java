/**
 * 
 */
package st.pro.browsergame.models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.JoinColumn;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import st.pro.browsergame.models.Purchase;
import st.pro.browsergame.models.Character;

/**
 * Model representing the user of the site
 * 
 * @author IL
 */
@Entity(name = "User")
//@JsonIgnoreProperties("password")
public class User implements Serializable {

	private static final long serialVersionUID = 2L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@Column(name = "email", nullable = false, unique = true)
	private String email;
	private String username;
	private String password;
	private String address;
	private String ingameName;
	private Short gold = 0;
	private Short crystal = 30;
	private Short guildPoints = 0;

	/*
	 * @OneToMany(mappedBy = "owner", fetch = FetchType.EAGER, cascade =
	 * CascadeType.ALL) private Character character;
	 */
	
	@OneToMany(mappedBy="owner",
			cascade = CascadeType.ALL)
	@LazyCollection(LazyCollectionOption.FALSE) //removed fetch type eager and added this
	private List<Purchase> purchases;
	
	@OneToMany(mappedBy="owner",
			cascade = CascadeType.ALL)
	@LazyCollection(LazyCollectionOption.FALSE) //removed fetch type eager and added this
	private List<Character> characters;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "id"))
	private Set<Role> roles;

	public User() {

	}

	public User(String email, String username, String password, String address, String ingameName) {
		super();
		this.email = email;
		this.username = username;
		this.password = password;
		this.address = address;
		this.ingameName = ingameName;
		

	}

	public User(int id, String email, String username, String password, String address, String ingameName, Short gold, Short crystal, Short guildPoints, Set<Role> roles) {
		super();
		this.id = id;
		this.email = email;
		this.username = username;
		this.password = password;
		this.address = address;
		this.ingameName = ingameName;
		this.roles = roles;
		this.gold = gold;
		this.crystal = crystal;
		this.guildPoints = guildPoints;
	}
	
	public Short getGold() {
		return gold;
	}

	public void setGold(Short gold) {
		this.gold = gold;
	}

	public Short getCrystal() {
		return crystal;
	}

	public void setCrystal(Short crystal) {
		this.crystal = crystal;
	}

	public Short getGuildPoints() {
		return guildPoints;
	}

	public void setGuildPoints(Short guildPoints) {
		this.guildPoints = guildPoints;
	}

	public List<Purchase> getPurchases() {
		if (null == purchases) {
			purchases = new ArrayList<>();
		}
		return purchases;
	}

	public void setPurchases(List<Purchase> purchases) {
		this.purchases = purchases;
	}

	public void addPurchase(Purchase purchase) {
		getPurchases().add(purchase);
	}
	
	public List<Character> getCharacters() {
		if (null == characters) {
			characters = new ArrayList<>();
		}
		return characters;
	}

	public void setCharacters(List<Character> characters) {
		this.characters = characters;
	}

	public void addCharacter(Character character) {
		getCharacters().add(character);
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getIngameName() {
		return ingameName;
	}

	public void setIngameName(String ingameName) {
		this.ingameName = ingameName;
	}


	public void addRole(Role role) {
		if (roles == null) {
			roles = new HashSet<Role>();
		}
		roles.add(role);
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((email == null) ? 0 : email.hashCode());
		result = prime * result + id;
		result = prime * result + ((username == null) ? 0 : username.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		if (id != other.id)
			return false;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		return true;
	}

}
