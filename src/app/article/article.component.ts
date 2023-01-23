import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Article } from '../models/article';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  voirListesArticles: boolean = true;
  voirFormulaireAjout: boolean = true;
  voirFormulaireModification: boolean = true;
  voirPageDetail: boolean = true;

  article = this.articleService.article;
  articles : Article[] = [];
  erreur: boolean = true;
  messageErreur: string = "";

  constructor(private articleService: ArticleService) { }

  articleForm: any;
  ngOnInit(): void {
    this.articleForm = new FormGroup({
      code: new FormControl(this.article.code, [Validators.required]),
      designation: new FormControl(this.article.designation, [Validators.required]),
      prixUnitaire: new FormControl(this.article.prixUnitaire, [Validators.required]),
      quantite: new FormControl(this.article.quantite, [Validators.required]),
      description: new FormControl(this.article.description, [Validators.required]),
    })
    this.listesArticles();
  }

  get code(){
    return this.articleForm.get('code');
  }

  get designation() {
    return this.articleForm.get('designation');
  }
  get prixUnitaire() {
    return this.articleForm.get('prixUnitaire');
  }
  get quantite() {
    return this.articleForm.get('quantite');
  }
  get description() {
    return this.articleForm.get('description');
  }

  //Méthode de la liste de tous les articles à partir du service article
  listesArticles(): void {
    this.articleService.getAll().subscribe(response=>{
      this.articles = response;
    })
  }

  //Méthode de détail d'un article à partir du service article
  detailArticle(id: number): void {
    this.articleService.findById(id).subscribe(response=>{
      this.article = response;
    })
  }

  //Méthode d'ajout d'un article à partir du service article
  ajouterArticle(): void {
    this.articleService.addArticle(this.article).subscribe(
      (response) =>{
      console.log(response);
        if(response.id > 0) {
          this.articles.push({
            id: response.id,
            code: response.code,
            designation: response.designation,
            prixUnitaire: response.prixUnitaire,
            quantite: response.quantite,
            description: response.description
          });
          this.article = new Article();
          this.retour();
        }
        else{
          this.erreur = false;
          this.messageErreur = "Erreur lors de l'ajout, code déjà existant"
          this.afficherFormulaireAjouter();
          this.article.code = response.code;
          this.article.designation = response.designation;
          this.article.prixUnitaire = response.prixUnitaire;
          this.article.quantite = response.quantite;
          this.article.description = response.description;
        }
      },
      (error) =>{
        console.log(error)
      })
  }

  //Méthode de modification d'un article à partir du service article
  modifierArticle(): void {
    this.articleService.updateArticle(this.article.id, this.article).subscribe(
      (response) =>{
        console.log(response);
        if(response.id > 0) {
          this.retour();
          this.listesArticles();
        }
        else{
          this.erreur = false;
          this.messageErreur = `Erreur lors de la modification, code déjà existant`;
          this.afficherFormulaireModifier(this.article.id);
        }
    },
    (error) =>{
      console.log(error)
    })
  }

  //Méthode de suppression d'un article à partir du service article
  supprimerArticle(id: number): void {
    this.articleService.deleteArticle(id).subscribe(response=>{
      console.log(response);
      // for (let index = 0; index < this.articles.length; index++) {
      //   if (index == id) {
      //     this.articles.splice(id,1);
      //   }
      // }
      this.listesArticles()
    });
  }

  //Méthode d'affichage de la page de detail d'un article
  afficherPageDetail(id: number): void {
    this.voirListesArticles = false;
    this.voirFormulaireAjout = true;
    this.voirFormulaireModification = true;
    this.voirPageDetail = false;
    this.detailArticle(id);
  }

  //Méthode d'affichage de la page d'ajout d'un article
  afficherFormulaireAjouter(): void {
    this.voirListesArticles = false;
    this.voirFormulaireAjout = false;
    this.voirFormulaireModification;
    this.article = new Article();
  }

  //Méthode d'affichage de la page de modification d'un article
  afficherFormulaireModifier(id: number): void {
    this.voirListesArticles = false;
    this.voirFormulaireModification = false;
    this.detailArticle(id);
  }

  //Méthode de retour de page de la liste des articles
  retour(): void {
    this.voirListesArticles = true;
    this.voirFormulaireAjout = true;
    this.voirFormulaireModification = true;
    this.voirPageDetail = true;
  }

}
