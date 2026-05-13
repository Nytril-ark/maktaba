import json
from django.core.management.base import BaseCommand
from books.models import Book

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        file_path = '../src/data/books.json'
        with open(file_path,'r',encoding='utf-8') as f:
            books_data = json.load(f)
        for item in books_data:
            authors_str = ", ".join(item.get('authors',[]))
            Book.objects.create(
                title = item.get('title','Unknown'),
                authors = authors_str,
                image_url=item.get('image'),
                category = item.get('category','general'),
                pages = item.get('pages',0),
                language = item.get('language','English'),
                description = item.get('description',''),
                status = item.get('status','available').lower(),
                rating = item.get('rating',0),
                id=f"{item.get('id', '000')}" 
            )