import { communities } from '../src/domain/data.js';
import { pool } from './db.js';

function numericMemberCount(value) {
  const match = String(value || '0').trim().match(/^([\d.]+)\s*([kKmM])?$/);
  if (!match) return 0;
  const multiplier = match[2]?.toLowerCase() === 'm' ? 1_000_000 : match[2]?.toLowerCase() === 'k' ? 1_000 : 1;
  return Math.round(Number(match[1]) * multiplier);
}

try {
  for (const community of communities) {
    await pool.query(
      `INSERT INTO communities (id, slug, category, price_type, access_type, member_count, details)
       VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb)
       ON CONFLICT (id) DO UPDATE SET
         slug = EXCLUDED.slug,
         category = EXCLUDED.category,
         price_type = EXCLUDED.price_type,
         access_type = EXCLUDED.access_type,
         details = EXCLUDED.details`,
      [
        String(community.id),
        community.slug,
        community.category,
        community.priceType,
        community.accessType,
        numericMemberCount(community.members),
        JSON.stringify(community)
      ]
    );
  }
  console.info(`Seeded ${communities.length} prototype communities`);
} finally {
  await pool.end();
}
