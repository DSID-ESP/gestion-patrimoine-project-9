package sn.douanes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sn.douanes.entities.Huile;

@Repository
public interface HuileRepository extends JpaRepository<Huile, String> {

}
