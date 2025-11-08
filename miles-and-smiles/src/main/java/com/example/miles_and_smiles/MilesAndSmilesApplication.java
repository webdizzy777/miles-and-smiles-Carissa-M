package com.example.miles_and_smiles;

import com.example.miles_and_smiles.models.Category;
import com.example.miles_and_smiles.repositories.CategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class MilesAndSmilesApplication {

	public static void main(String[] args) {
		SpringApplication.run(MilesAndSmilesApplication.class, args);
	}

	// Create default categories if none exist at application startup
	@Bean
	CommandLineRunner seedCategories(CategoryRepository categoryRepository) {
		return args -> {
			if (categoryRepository.count() == 0) {
				List<String> defaults = List.of(
						"Gas",
						"Restaurant",
						"Supermarket",
						"Discount",
						"Wholesale",
						"Online Shopping",
						"Utilities",
						"Internet",
						"Phone",
						"Travel",
						"Other"
				);

				for (String name : defaults) {
					categoryRepository.save(new Category(name));
				}
			}
		};
	}
}
