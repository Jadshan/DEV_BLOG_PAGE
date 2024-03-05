import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css'],
})
export class SingleCategoryComponent implements OnInit {
  categoryPosts: any[] = [];
  categoryId: any;
  categoryName: string = '';
  constructor(
    private postService: PostsService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((val) => {
      this.categoryName = val['category'];
      this.categoryId = val['id'];
      this.postService.loadCategoryPosts(this.categoryId).subscribe((val) => {
        this.categoryPosts = val;
      });
    });
  }
}
