from django.db import models

class Estudiante(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    grado = models.CharField(max_length=50)
    # Relación ForeignKey hacia el modelo Curso de la app 'cursos'
    curso = models.ForeignKey(
        'cursos.Curso', 
        on_delete=models.CASCADE, 
        related_name='estudiantes'
    )

    def __str__(self):
        return f"{self.nombre} {self.apellido} - {self.grado}"