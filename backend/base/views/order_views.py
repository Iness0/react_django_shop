from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.contrib.auth.models import User
from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializer import ProductSchema, UserSchema, UserSchemaWithToken

from rest_framework import status


@api_view('POST')
@permission_classes(['IsAuthenticated'])
def addOrderItems(request):
    user = request.user
    data = request.data
    return Response('ORDER')