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

@RestController
public class AdminPortalRest {

	private CommentRepository commentRepo;

	@Autowired
	public AdminPortalRest(CommentRepository commentRepo) {
		this.commentRepo = commentRepo;
	}
	
	@GetMapping("/getAllCommentsTwo")
    public Page<Comment> getAllComments(Pageable pageable) {
        return commentRepo.findAll(pageable);
    }
	
	@PostMapping("/deleteComment")
	public ResponseEntity<String> deleteComment(@RequestParam(name = "id") int id, HttpSession session) {
		List<st.pro.browsergame.models.Comment> comments = commentRepo.findAll();
		Comment commentForDelete = comments.stream().filter(comment -> id == comment.getId()).findFirst()
				.orElse(null);
		if (null != commentForDelete) {
			comments.remove(commentForDelete);
			commentRepo.deleteById(commentForDelete.getId());
		}
		return ResponseEntity.ok().body("Comment with id: " + id + " has been deleted");
	}
}