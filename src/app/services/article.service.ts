import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  public article: Article = new Article();
  url!: string;

  constructor(private httpClient: HttpClient) {
    const APIEndpoint = environment.APIEndpoint;
    this.url = APIEndpoint + 'api/';
  }

   //Methode de recupération de tous les articles à partir de l'api
  getAll(): Observable<Array<Article>>{
    return this.httpClient.get<Array<Article>>(this.url + 'articles');
  }

   //Methode de récupération d'un article à partir de l'api
  findById(id: number): Observable<Article>{
    return this.httpClient.get<Article>(this.url + 'article/' + id);
  }

  //Methode d'ajout d'un article à partir de l'api
  addArticle(a: Article): Observable<Article>{
    return this.httpClient.post<Article>(this.url + 'article/ajouter', a);
  }

  //Methode de modification d'un article à partir de l'api
  updateArticle(id: number, a: Article): Observable<Article>{
    return this.httpClient.put<Article>(this.url + 'article/modifier/'+id, a);
  }

  //Methode de suppression d'un article à partir de l'api
  deleteArticle(id: number){
    return this.httpClient.delete(this.url + 'article/supprimer/' + id);
  }
}
