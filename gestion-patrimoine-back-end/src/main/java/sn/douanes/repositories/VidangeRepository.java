package sn.douanes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sn.douanes.entities.Vidange;

@Repository
public interface VidangeRepository extends JpaRepository<Vidange, String> {


}
