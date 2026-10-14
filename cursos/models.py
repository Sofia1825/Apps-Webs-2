from django.db import models

class Curso(models.Model):
    nombre = models.CharField(max_length=100)
    codigo = models.CharField(max_length=20, unique=True)
    # Relación ForeignKey hacia el modelo Profesor de la app 'profesores'
    profesor = models.ForeignKey(
        'profesores.Profesor', 
        on_delete=models.CASCADE, 
        related_name='cursos'
    )

    def __str__(self):
        return f"{self.nombre} ({self.codigo})"