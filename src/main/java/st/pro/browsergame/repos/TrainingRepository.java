/**
 * 
 */
package st.pro.browsergame.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import st.pro.browsergame.models.Training;

/**
 * @author Pc
 *
 */
@Repository
public interface TrainingRepository extends JpaRepository<Training, Integer>{

}