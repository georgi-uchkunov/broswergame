/**
 * 
 */
package st.pro.browsergame.rest;


import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import st.pro.browsergame.models.Character;
import st.pro.browsergame.models.Mission;
import st.pro.browsergame.models.ShopItem;
import st.pro.browsergame.repos.ShopItemRepository;


/**
 * @author Pc
 *
 */
@RestController
public class ShopItemRest {

	
	private ShopItemRepository shopItemRepo;


	@Autowired
	public ShopItemRest(ShopItemRepository shopItemRepo) {
		this.shopItemRepo = shopItemRepo;
	}
	
	@PostMapping(value = "/createItem")
	public ShopItem shopItem(@RequestParam(name = "title") String title, @RequestParam(name = "price") String price,
			@RequestParam(name = "image") String image, @RequestParam(name = "stock") int stock) {
		final ShopItem newShopItem = new ShopItem(title, price, image, stock);
		return shopItemRepo.saveAndFlush(newShopItem);
	}
	
	@GetMapping("/getAllShopItems")
    public Page<ShopItem> getAllComments(Pageable pageable) {
        return shopItemRepo.findAll(pageable);
    }
	
	@PostMapping(value = "/changeItemStock")
	public ShopItem changeItemStock(@RequestParam(name = "id") int id) {
		Optional<ShopItem> shopItemForUpdate = shopItemRepo.findById(id);
		if (shopItemForUpdate.isPresent()) {
			ShopItem currentItemForUpdate = shopItemForUpdate.get();
			currentItemForUpdate.setStock(currentItemForUpdate.getStock() - 1);
			return shopItemRepo.saveAndFlush(currentItemForUpdate);
		}
		return null;

	}
	
	@PostMapping(value = "/changeItemStockOnCancelOrder")
	public ShopItem changeStockOnCancelOrder(@RequestParam(name = "title") String title) {
		List<ShopItem> shopItems = shopItemRepo.findAll();
		for(int i = 0; i < shopItems.size(); i++) {
			ShopItem currentShopItem = shopItems.get(i);
			if(currentShopItem.getTitle().equalsIgnoreCase(title)) {
				
				currentShopItem.setStock(currentShopItem.getStock() + 1);
				return shopItemRepo.saveAndFlush(currentShopItem);
			}
		}
		
		return null;

	}
	
	@PostMapping(value = "/updateShopItem")
	public ShopItem updateShopItem(ShopItem shopItemForUpdate) {

		return shopItemRepo.saveAndFlush(shopItemForUpdate);
	}
	
	@PostMapping("/deleteShopItem")
	public ResponseEntity<String> deleteShopItem(@RequestParam(name = "id") int id, HttpSession session) {
		List<st.pro.browsergame.models.ShopItem> shopItems = shopItemRepo.findAll();
		ShopItem shopItemForDelete = shopItems.stream().filter(shopItem -> id == shopItem.getId()).findFirst()
				.orElse(null);
		if (null != shopItemForDelete) {
			shopItems.remove(shopItemForDelete);
			shopItemRepo.deleteById(shopItemForDelete.getId());
		}
		return ResponseEntity.ok().body("Shop item with id: " + id + " has been deleted");
	}
	
}