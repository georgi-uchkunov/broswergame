/**
 * 
 */
package st.pro.browsergame.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import st.pro.browsergame.models.Role;

/**
 * Repository for Role model
 * @author IL
 */
@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

}
