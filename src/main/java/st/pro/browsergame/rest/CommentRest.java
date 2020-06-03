package st.pro.browsergame.rest;

import org.springframework.beans.factory.annotation.Autowired;
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
	public Comment comment(@RequestParam(name = "commenterName") String commenterName, @RequestParam(name = "commenterEmail") String commenterEmail,
			@RequestParam(name = "commenterComment") String commenterComment) {
		final Comment newComment = new Comment(commenterName, commenterEmail, commenterComment);
		return repository.saveAndFlush(newComment);
	}

}