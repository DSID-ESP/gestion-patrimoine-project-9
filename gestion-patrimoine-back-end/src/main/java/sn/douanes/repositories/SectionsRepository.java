package sn.douanes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sn.douanes.entities.Sections;


@Repository
public interface SectionsRepository extends JpaRepository<Sections, String> {

}
