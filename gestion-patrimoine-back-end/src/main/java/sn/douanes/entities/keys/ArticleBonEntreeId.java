package sn.douanes.entities.keys;

import java.io.Serializable;

public class ArticleBonEntreeId implements Serializable {

    private Integer codeArticleBonEntree;
    private String identifiantBE;

    public ArticleBonEntreeId() {
    }

    public ArticleBonEntreeId(Integer codeArticleBonEntree, String identifiantBE) {
        this.codeArticleBonEntree = codeArticleBonEntree;
        this.identifiantBE = identifiantBE;
    }
}
