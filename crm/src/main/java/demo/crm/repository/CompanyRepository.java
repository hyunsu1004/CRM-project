package demo.crm.repository;

import demo.crm.entity.Startup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Startup ,Long> {
}
