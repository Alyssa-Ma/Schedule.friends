from django.db import models

# Create your models here.
class Testing(models.Model):
    name = models.CharField("Name", max_length=240)

    def __str__(self):
        return self.name
