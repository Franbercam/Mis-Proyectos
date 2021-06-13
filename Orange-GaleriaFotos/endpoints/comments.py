from silence.decorators import endpoint

@endpoint(
    route="/comments",
    method="GET",
    sql="SELECT * FROM Comments"
)
def get_all():
    pass

###############################################################################

@endpoint(
    route="/comments/$photoId",
    method="GET",
    sql="SELECT comments.userId, comments.description, comments.commentDate FROM comments INNER join photos on (photos.photoId = comments.commentId) WHERE photos.photoId = $photoId;"
)
def get_by_id():
    pass

###############################################################################

@endpoint(
    route="/comments",
    method="POST",
    sql="INSERT INTO Comments (userId, photoId, description) VALUES ($userId, $photoId, $description)",
    description="Creates a new comment",
    auth_required=True,
)
def create(userId, photoId, description):
    pass

###############################################################################