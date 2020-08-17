/**
 * 
 */
package st.pro.browsergame.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import st.pro.browsergame.models.Mission;

/**
 * @author Pc
 *
 */
@Repository
public interface MissionRepository extends JpaRepository<Mission, Integer>{

}