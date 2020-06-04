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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import st.pro.browsergame.models.Comment;
import st.pro.browsergame.models.Purchase;
import st.pro.browsergame.models.User;
import st.pro.browsergame.repos.PurchaseRepository;
import st.pro.browsergame.repos.UserRepository;

@RestController
public class PurchaseManagerRest {
	
	private PurchaseRepository purRepo;
	private UserRepository userRepo;

	@Autowired
	public PurchaseManagerRest(PurchaseRepository purRepo, UserRepository userRepo) {
		this.purRepo = purRepo;
		this.userRepo = userRepo;
	}
	
	
	@PostMapping("/cancelMyPurchase")
	public ResponseEntity<String> cancelPurchase
						(@RequestParam(name = "id") int id,
										HttpSession session){
		final User user = (User) session.getAttribute("currentUser");
		if (null == user) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body("");
		}
		List<Purchase> purchases = user.getPurchases();
		Purchase purchaseForCancel = purchases.stream()
							.filter(purchase->id == purchase.getId())
							.findFirst().orElse(null);
		if(null != purchaseForCancel) {
			purchases.remove(purchaseForCancel);
			session.setAttribute("currentUser", userRepo.save(user));
			purRepo.delete(purchaseForCancel);
		}
		return ResponseEntity.ok().body("Purchase with id: "+ id + " is cancelled");
	}
	
	@GetMapping("/getMyPurchases")
	public ResponseEntity<List<Purchase>> getAllPurchases(HttpSession session) {
		final List<Purchase> purchases = new ArrayList<>();
		final User user = (User) session.getAttribute("currentUser");
		if (null == user) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(purchases);
		} else {
			purchases.addAll(user.getPurchases());
		}
		return ResponseEntity.ok(purchases);
	}

	@PostMapping("/createPurchase")
	public ResponseEntity<Purchase> createPurchase(@RequestParam(name = "title") String title,
			@RequestParam(name = "price") String price, HttpSession session) {

		
		final User user = (User) session.getAttribute("currentUser");
		if (null == user) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}
		final Purchase purchase = new Purchase(title, price);
		purchase.setOwner(user);
		user.addPurchase(purchase);
		session.setAttribute("currentUser", userRepo.save(user));

		return ResponseEntity.ok(purchase);
	}
	
	@GetMapping("/getAllUserPurchases")
    public Page<Purchase> getAllUserPurchases(Pageable pageable) {
        return purRepo.findAll(pageable);
    }

}