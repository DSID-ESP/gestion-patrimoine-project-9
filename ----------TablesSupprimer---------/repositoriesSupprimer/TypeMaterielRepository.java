package sn.douanes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sn.douanes.entities.TypeMateriel;


@Repository
public interface TypeMaterielRepository extends JpaRepository<TypeMateriel, String> {
}
