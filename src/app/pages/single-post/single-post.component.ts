import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent implements OnInit {
  singlePost: any;
  singlePostId: any;
  sameCategoryPosts: any[] = [];
  constructor(
    private postService: PostsService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((val) => {
      this.singlePostId = val['id'];

      this.postService.countViews(this.singlePostId);

      this.postService.loadSinglePost(val['id']).subscribe((val) => {
        this.singlePost = val;
        console.log('single', this.singlePost);
        this.postService
          .loadCategoryPosts(this.singlePost.category.categoryId)
          .subscribe((val) => {
            this.sameCategoryPosts = val;
            console.log('similar', this.sameCategoryPosts);
          });
      });
    });
  }
}
