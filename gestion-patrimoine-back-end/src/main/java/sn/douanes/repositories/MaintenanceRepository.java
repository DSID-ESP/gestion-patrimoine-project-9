package sn.douanes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sn.douanes.entities.Maintenance;

@Repository
public interface MaintenanceRepository extends JpaRepository<Maintenance, String> {


}
