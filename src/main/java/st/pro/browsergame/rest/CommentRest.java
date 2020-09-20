package st.pro.browsergame.rest;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import st.pro.browsergame.models.Comment;
import st.pro.browsergame.repos.CommentRepository;

/**
 * Rest controller for user feedback
 * 
 * @author
 */
@RestController
public class CommentRest {

	private CommentRepository repository;

	@Autowired
	public CommentRest(final CommentRepository repository) {
		this.repository = repository;

	}

	@PostMapping(value = "/comment")
	public Comment comment(@RequestParam(name = "commenterName") String commenterName,
			@RequestParam(name = "commenterEmail") String commenterEmail,
			@RequestParam(name = "commenterComment") String commenterComment) {
		if (!commenterName.equalsIgnoreCase("") && !commenterEmail.equalsIgnoreCase("")
				&& !commenterComment.equalsIgnoreCase("")) {
			final Comment newComment = new Comment(commenterName, commenterEmail, commenterComment);
			return repository.saveAndFlush(newComment);
		}
		return null;
	}
	
	@GetMapping("/getAllCommentsTwo")
    public Page<Comment> getAllComments(Pageable pageable) {
        return repository.findAll(pageable);
    }
	
	@PostMapping("/deleteComment")
	public ResponseEntity<String> deleteComment(@RequestParam(name = "id") int id, HttpSession session) {
		List<st.pro.browsergame.models.Comment> comments = repository.findAll();
		Comment commentForDelete = comments.stream().filter(comment -> id == comment.getId()).findFirst()
				.orElse(null);
		if (null != commentForDelete) {
			comments.remove(commentForDelete);
			repository.deleteById(commentForDelete.getId());
		}
		return ResponseEntity.ok().body("Comment with id: " + id + " has been deleted");
	}

}