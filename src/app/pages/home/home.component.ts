import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  featuredPosts: any[] = [];
  latestPosts: any[] = [];

  constructor(private postService: PostsService) {
    this.postService.loadFeatured().subscribe((val) => {
      this.featuredPosts = val;
    });
    this.postService.loadFeatured().subscribe((val) => {
      this.latestPosts = val;
    });
  }
  ngOnInit(): void {}
}
