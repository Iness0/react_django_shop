from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Product
from base.serializer import ProductSchema

from rest_framework import status


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSchema(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    products = Product.objects.get(_id=pk)
    serializer = ProductSchema(products, many=False)
    return Response(serializer.data)
