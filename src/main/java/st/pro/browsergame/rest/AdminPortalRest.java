package st.pro.browsergame.rest;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import st.pro.browsergame.models.Comment;
import st.pro.browsergame.models.User;
import st.pro.browsergame.repos.CommentRepository;

@RestController
public class AdminPortalRest {

	private CommentRepository commentRepo;

	@Autowired
	public AdminPortalRest(CommentRepository commentRepo) {
		this.commentRepo = commentRepo;
	}

	
	@GetMapping("/getAllComments")
	public ResponseEntity<List<Comment>> getAllComments(HttpSession session) {
		final List<Comment> comments = new ArrayList<>();
		
		
		return ResponseEntity.ok(comments);
	}
	
	@GetMapping("/getAllCommentsTwo")
    public Page<Comment> getAllComments(Pageable pageable) {
        return commentRepo.findAll(pageable);
    }
	
	/*
	 * @PostMapping("/deleteMyCharacter") public ResponseEntity<String>
	 * deleteCharacter(@RequestParam(name = "id") int id, HttpSession session) {
	 * final User user = (User) session.getAttribute("currentUser"); if (null ==
	 * user) { return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(""); }
	 * List<st.pro.browsergame.models.Character> characters = user.getCharacters();
	 * Character characterForDelete = characters.stream().filter(character -> id ==
	 * character.getId()).findFirst() .orElse(null); if (null != characterForDelete)
	 * { characters.remove(characterForDelete); session.setAttribute("currentUser",
	 * userRepo.save(user)); //charRepo.delete(characterForDelete);
	 * charRepo.deleteById(characterForDelete.getId()); } return
	 * ResponseEntity.ok().body("Character with id: " + id + " has been deleted"); }
	 */
}