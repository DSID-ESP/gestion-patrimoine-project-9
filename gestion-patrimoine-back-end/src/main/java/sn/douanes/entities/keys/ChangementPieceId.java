package sn.douanes.entities.keys;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;

public class ChangementPieceId implements Serializable {

    private Integer codeChangementPiece;
    private String identifiantMaintenance;


    public ChangementPieceId() {
    }

    public ChangementPieceId(Integer codeChangementPiece, String identifiantMaintenance) {
        this.codeChangementPiece = codeChangementPiece;
        this.identifiantMaintenance = identifiantMaintenance;
    }
}
