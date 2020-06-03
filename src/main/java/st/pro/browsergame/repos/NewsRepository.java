package st.pro.browsergame.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import st.pro.browsergame.models.News;

/**
 * Repository for News model
 * 
 * @author
 */
@Repository
public interface NewsRepository extends JpaRepository<News, Integer> {

}