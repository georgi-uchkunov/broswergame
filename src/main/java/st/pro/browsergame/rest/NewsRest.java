package st.pro.browsergame.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import st.pro.browsergame.models.News;
import st.pro.browsergame.repos.NewsRepository;

/**
 * Rest controller for admin news
 * 
 * @author
 */
@RestController
public class NewsRest {

	private NewsRepository repository;

	@Autowired
	public NewsRest(final NewsRepository repository) {
		this.repository = repository;

	}
	
	@PostMapping(value = "/postNews")
	public News news(@RequestParam(name = "newsTitle") String newsTitle, @RequestParam(name = "newsImage") String newsImage,
			@RequestParam(name = "newsText") String newsText) {
		final News newNews = new News(newsTitle, newsImage, newsText);
		return repository.saveAndFlush(newNews);
	}

}