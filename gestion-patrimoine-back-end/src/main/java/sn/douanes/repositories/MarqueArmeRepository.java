package sn.douanes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sn.douanes.entities.MarqueArme;


@Repository
public interface MarqueArmeRepository extends JpaRepository<MarqueArme, String> {
}
