from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.CreateNote.as_view(), name="create_notes"),
    path("notes/delete/<int:pk>/", views.DeleteNote.as_view(), name="delete_note"),
]