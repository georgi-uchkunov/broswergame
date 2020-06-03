/**
 * 
 */
package st.pro.browsergame.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import st.pro.browsergame.models.ShopItem;

/**
 * @author Pc
 *
 */
@Repository
public interface ShopItemRepository extends JpaRepository<ShopItem, Integer>{

}
