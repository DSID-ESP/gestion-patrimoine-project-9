package sn.douanes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sn.douanes.entities.TypeObjet;

@Repository
public interface TypeObjetRepository extends JpaRepository<TypeObjet, String> {

}
