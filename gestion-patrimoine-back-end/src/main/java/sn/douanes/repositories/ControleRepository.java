package sn.douanes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sn.douanes.entities.Controle;
import sn.douanes.entities.keys.ControleId;

@Repository
public interface ControleRepository extends JpaRepository<Controle, ControleId> {
}
