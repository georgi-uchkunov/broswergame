package st.pro.browsergame.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import st.pro.browsergame.models.Comment;

/**
 * Repository for Comment model
 * 
 * @author
 */
@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {

}