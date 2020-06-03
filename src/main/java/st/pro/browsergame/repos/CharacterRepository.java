package st.pro.browsergame.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import st.pro.browsergame.models.Character;

/**
 * Repository for Character model
 * 
 * @author GU
 */
@Repository
public interface CharacterRepository extends JpaRepository<Character, Integer> {

}
