from flask import Blueprint, render_template, redirect, url_for

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
@main_bp.route('/home/<page_num>')
def home(page_num=None):
    if not page_num:
        return render_template('public/landing/index.html')
    return render_template(f'public/landing/index{page_num}.html')

@main_bp.route('/about')
def about():
    return render_template('public/about.html')