ALTER TABLE communities
  ADD COLUMN owner_id UUID REFERENCES users(id) ON DELETE CASCADE;

CREATE INDEX communities_owner_id_idx ON communities (owner_id);
