package st.pro.browsergame.repos;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import st.pro.browsergame.models.Purchase;

@Repository
public interface PurchaseRepository extends JpaRepository<Purchase, Integer> {

}