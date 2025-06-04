from django.contrib import admin
from . models import Useform

# Register your models here.


class UserAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "password", "age", "qualification", "level")

admin.site.register(Useform, UserAdmin)

